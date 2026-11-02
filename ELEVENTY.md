# 构建与部署

使用 Node 24，pnpm 版本由 package.json 固定。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

静态产物位于 `_site/`。本地预览使用 `pnpm dev` 或 `pnpm preview`，默认只监听 `127.0.0.1:4173`；可用 `PORT=4174 pnpm preview` 更换端口。

构建正式镜像：

```sh
docker build -t hmcl-docs:local .
DOCS_IMAGE=hmcl-docs:local docker-compose up -d
```

如现有站点已占用 3005，可使用 `DOCS_PORT=13005 DOCS_IMAGE=hmcl-docs:local docker-compose -p hmcl-docs-preview up -d` 在 `127.0.0.1:13005` 并行预览。

镜像基于固定摘要的官方 Nginx，仅复制 `_site/` 和 nginx.conf。运行端口为 `127.0.0.1:3005`，使用非 root 用户、只读根文件系统和临时 `/tmp`，不挂载宿主机网页目录，也不包含 Node、Ruby 或源码。

`.drone.yml` 在 main 推送后依次执行 pnpm 构建、Dockerfile 镜像构建/推送、Compose 更新。镜像构建使用无需特权模式或 Docker socket 的 Kaniko。部署 SSH 密钥在服务器端只允许更新固定的 Nginx Compose 服务，不提供任意 shell。

Drone 使用的站点专用配置：

- `docs_registry_username`、`docs_registry_password`：共享 Registry 网关认证，供 Kaniko 插件初始化登录配置及公网回退访问使用；可信内网入口本身不要求登录。
- `docs_deploy_host`、`docs_deploy_key`、`docs_deploy_fingerprint`：部署 SSH 地址、受限密钥和主机公钥指纹。
- 镜像仓库：`registry.hmcl.net/image/hmcl-docs`；Compose 文件：`/data/docs.hmcl.net/docker-compose.yml`。

复用现有共享 Registry。构建节点和部署主机通过内网 DNS 将 `registry.hmcl.net` 解析到可信内网入口，使用现有公开可信 HTTPS 证书，不需要额外 CA、关闭证书校验或挂载宿主机配置。Nginx 对可信内网免认证，公网客户端需要 `docker login registry.hmcl.net`；密码由宿主机管理，不写入项目。CI 必须实际验证内网解析与镜像推送，不能仅依赖宿主机 hosts。

仓库不包含宿主机安装、迁移、试运行、清理或临时发布脚本。源码推送由维护者执行；本地修改不会自动上线。迁移时的比对工具和报告保留在仓库之外。

原 Markdown、目录、YAML/CSV 数据、布局和公开 URL 保持原用法。站点图片、字体等资源继续位于原 `assets/`，构建先原样复制到 `_site/assets/`。PNG/JPEG/TIFF 在构建时生成额外 WebP，例如 `_site/assets/img/example.png.webp`，通过 `<picture>` 优先加载 WebP、以原图回退。源码已提供的同名 WebP 优先复用，GIF 不自动转换。

**所有新生成的 WebP 只写入 `_site/`，不回写 `assets/` 或主题目录。** `_site/` 已被 Git 忽略，Docker 镜像直接包含其中的原图、WebP 和 HTML；无需更改 `.md` 图片路径。编码使用 Sharp，质量参数与旧插件一致为 100。旧 WebP 地址在没有对应文件时仍可回退到原图。

构建不运行旧 Ruby 插件。`theme/minimal-mistakes/prebuilt` 只保留首次迁移需要对齐的编译 CSS 和主题搜索脚本，不包含站点图片或字体副本。当前修改 SCSS 不会自动编译 CSS，需要另行接入样式编译。`theme/compat-code.json` 只保存未修改代码块的高亮 token，正文仍从 Markdown 构建，新代码会重新高亮。

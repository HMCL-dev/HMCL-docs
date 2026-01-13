module VersionSortFilter
  def version_sort(input, property)
    raise ArgumentError, "Cannot sort a null object." if input.nil?
    raise ArgumentError, "Cannot sort an object with a null property." if property.nil?
    raise ArgumentError, "Property #{property} is not an array of strings." unless valid_string_array?(input, property)

    input.sort_by { |version| version_to_numbers(version[property]) }
  end

  private

  def valid_string_array?(array, property)
    array.is_a?(Array) && array.all? { |element| element[property].is_a?(String) }
  end

  def version_to_numbers(version_string)
    version_string.split('.').map { |n| n.to_i }
  end
end

Liquid::Template.register_filter(VersionSortFilter)

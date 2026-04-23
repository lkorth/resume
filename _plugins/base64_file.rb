require 'base64'

module Jekyll
  module Base64FileFilter
    def base64_file(path)
      full_path = File.join(@context.registers[:site].source, path)
      Base64.strict_encode64(File.binread(full_path))
    end
  end
end

Liquid::Template.register_filter(Jekyll::Base64FileFilter)

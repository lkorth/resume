require 'japr'

module JAPR
  class CssTagTemplate < JAPR::Template
    def self.filetype
      '.css'
    end

    def html
      "<link href='/#{@path}/#{@filename}' rel='stylesheet' type='text/css' media='screen' />"
    end
  end

  class CssCompressor < JAPR::Compressor
    require 'yui/compressor'

    def self.filetype
      '.css'
    end

    def compress
      return YUI::CssCompressor.new.compress(@content)
    end
  end

  class JavaScriptCompressor < JAPR::Compressor
    require 'yui/compressor'

    def self.filetype
      '.js'
    end

    def compress
      return YUI::JavaScriptCompressor.new(munge: true).compress(@content)
    end
  end
end

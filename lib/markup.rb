require 'github/markup'

class Markup
  def generate_html(markdown_path, css_path)
    html = GitHub::Markup.render(markdown_path)
    add_head!(html, css_path)
  end

  def add_head!(html, css_path)
    head = <<HEAD
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>Resumé</title>
  <style>#{File.read(css_path)}</style>
</head>
<body>
HEAD

    close = <<CLOSE
</body>
</html>
CLOSE

    html.insert(0, head)
    html.insert(-1, close)
    html
  end
end

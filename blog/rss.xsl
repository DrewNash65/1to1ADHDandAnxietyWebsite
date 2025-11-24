<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <meta charset="utf-8"/>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <style>
          body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.5;padding:24px}
          .item{border-bottom:1px solid #e6e6e6;padding:16px 0}
          .meta{color:#6b7280;font-size:0.95rem}
          a.title{color:#0e8a9b;text-decoration:none;font-weight:700;font-size:1.1rem}
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="rss/channel/title"/></h1>
        <p><xsl:value-of select="rss/channel/description"/></p>
        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <div class="meta"><xsl:value-of select="pubDate"/></div>
            <div><a class="title" href="{link}"><xsl:value-of select="title"/></a></div>
            <div class="meta"><xsl:value-of select="substring(description,1,240)"/></div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

export const emailVerifyTemplate = `
<html>
<head>
    <title>{{title}}</title>
    <style>
        body {
          margin: 0;
        }
        p {
          color: white;
        }
        .app-name {
          color: white;
          font-size: 24pt;
          font-weight: bold;
        }
        .mail-title {
          color: white;
          font-size: 18pt;
          font-weight: bold;
        }
        .container {
          background-color: black;
          height: 100vh;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
        }
        .container .messagebox {
          border: 1px solid white;
          border-radius: 10px;
          padding: 20px;
          margin: 20px auto;
          width: 400px;
          max-width: 500px;
        }
        .container .token {
          font-family: monospace;
          font-size: 24px;
          letter-spacing: 2px;
          margin: 20px 0;
        }
        .container .disclaimer {
          color: #888;
          font-size: 14px;
          margin-top: 30px;
          margin-bottom: 30px;
        }
    </style>
</head>
<body>
  <div class="container">
    <table align="center" style="margin-bottom: 10px;">
      <tr>
        <td>
          <img width="64" height="64" src="https://i.postimg.cc/6QzXvQpZ/microblog-logo.png" />
        </td>
        <td valign="center">
          <span class="app-name">Odonto Chat</span>
        </td>
      </tr>
    </table>

    <table align="center">
      <tr>
        <td align="center">
          <span class="mail-title">{{title}}</span>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align="center">
          <img width="48" height="48" src="https://i.postimg.cc/1RdyB4cc/email.png" />
        </td>
      </tr>
    </table>

    <table class="messagebox">
        <tr>
            <td align="center">
                <p>{{message}}</p>
                <p class="token">{{token}}</p>
            </td>
        </tr>
    </table>
    <p class="disclaimer">If you did not request this, please ignore this email.</p>
  </div>
</body>
</html>
`;

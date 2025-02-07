export const forgotPasswordTemplate = `<html>
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
      <table align="center">
        <tr>
          <td>
            <img class="logo-img" width="64" height="64" src="https://i.postimg.cc/6QzXvQpZ/microblog-logo.png" />
          </td>
        <td>
          <h1 class="app-name">Odonto Chat</h1>
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
            <img width="48" height="48" src="https://i.postimg.cc/vm7mSMH8/locker.png" />
          </td>
        </tr>
      </table>    

      <table class="messagebox">
        <tr>
          <td align="center">
            <p>{{body}}</p>
            <div class="code">{{code}}</div>
            <a href=\"{{url}}\" class="reset-link">Reset password</a>
          </td>
        </tr>
        <tr>
          <td align="center">
            <p>If you did not request this, please ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;
export default {
  async fetch(request, env) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>3D Game Project</title>
          <style>
            body { margin: 0; overflow: hidden; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <h1>Ready for 3D Game Development</h1>
        </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });
  }
};

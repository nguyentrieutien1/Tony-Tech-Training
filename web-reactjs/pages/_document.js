import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link
        rel="stylesheet"
        media="screen"
        href="//netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <script src="//code.jquery.com/jquery.js"></script>
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    </Html>
  );
}

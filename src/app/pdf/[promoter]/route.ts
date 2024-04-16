// import { NextResponse } from "next/server";
// import chromium from '@sparticuz/chromium-min';
// import puppeteer from 'puppeteer-core';

// // import admin, { initializeApp } from "firebase-admin";

// // initializeApp({
// //   credential: admin.credential.cert(JSON.stringify(fireConfig)),
// // });

// export async function GET(
//   request: Request,
//   { params: { promoter } }: { params: { promoter: string } }
// ) {
//   const language = new URL(request.url).searchParams.get("language");

//   if (!language) {
//     console.log(language);
//     return NextResponse.json({
//       body: "No language specified",
//     });
//   }
//   console.log(process.env.NODE_ENV);
//   //   const storage = admin.storage().bucket();

//   //   storage.upload(`/${promoter}/${language}/${new Date().getTime()}`);

//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 420, height: 594, deviceScaleFactor: 8 });
//   let nextjsPortal = await page.$("nextjs-portal");
//   if (process.env.NODE_ENV === "production") {
//     await (nextjsPortal as any)?.evaluate((el: any) =>
//       el.setAttribute("style", "display:none !important")
//     );
//   } else {
//     await (nextjsPortal as any)?.evaluate((el: any) =>
//       el.setAttribute("style", "display:none !important")
//     );
//   }
//   await page.addStyleTag({
//     content: `nextjs-portal {
//       display: none !important;
//     }`,
//   });
//   // page
//   //   .on("console", (message) =>
//   //     console.log(
//   //       `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
//   //     )
//   //   )
//   //   .on("pageerror", ({ message }) => console.log(message))
//   //   .on("response", (response) =>
//   //     console.log(`${response.status()} ${response.url()}`)
//   //   );
//   await page.goto(
//     `${process.env.NEXT_PUBLIC_URL}/pdf/poster/${promoter}?language=${language}` ||
//       "",
//     {
//       waitUntil: "networkidle0",
//     }
//   );

//   const pdf = await page.pdf({
//     width: `${1 * 393}px`,
//     height: `${1 * 595}px`,
//     printBackground: true,
//     path: `${promoter.charAt(0).toUpperCase}${promoter.substring(
//       1
//     )}'s ${language.charAt(0).toUpperCase()}${language.substring(1)} Poster`,
//     margin: {
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//     },
//   });

//   await browser.close();

//   return new NextResponse(pdf, {
//     headers: {
//       "Content-Type": "application/pdf",
//       // "Content-Disposition": `attachment; filename="example.pdf"`,
//     },
//   });
// }

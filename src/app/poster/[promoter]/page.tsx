import Image from "next/image";
import { Red_Hat_Display } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import doctorImg from "@/assets/images/doctor.png";
import { cn } from "@/utils/cn";
import * as screenshots from "@/assets/images/screenshots";
import * as logos from "@/assets/images/logos";
import iconLogo from "@/assets/images/icon-logo.png";

const LOGO_TOP_PERCENTAGE = 3.5185185185;
const LOGO_LEFT_PERCENTAGE = 2.07142857143;
const LOGO_HEIGHT_PERCENTAGE = 8.8383838384;

const DOCTOR_BOTTOM_PERCENTAGE = -0.48148;
const DOCTOR_RIGHT_PERCENTAGE = -16.92857;
const DOCTOR_HEIGHT_PERCENTAGE = 34.8384;

const SHADOW_TOP_PERCENTAGE = 92.9562;
const SHADOW_LEFT_PERCENTAGE = 11.0236;
const SHADOW_HEIGHT_PERCENTAGE = 18.83838;

const ICON_TOP_PERCENTAGE = 1.04377104377;
const ICON_RIGHT_PERCENTAGE = 1.1447811448;
const ICON_HEIGHT_PERCENTAGE = 14.5117845118;

const TITLE_RIGHT_PERCENTAGE = 5.2380952381;
const TITLE_TOP_PERCENTAGE = 15.9427609428;
const POSTER_TITLE = ["Your Pocket", "*Doctor*"];

import { QRCode } from "react-qrcode-logo";
import QR from "./_qr";
import Head from "next/head";

function extractDetails(input: string):
  | {
      special: string;
      rest: [string, string] | [string];
      position: 0 | 1 | 2;
    }
  | {
      special: null;
      rest: string;
      position: -1;
    } {
  // Split the input into parts, isolating the asterisk-enclosed portion
  const parts = input.split(/(\*[^*]+\*)/);
  const cleanedParts = parts.map((part) =>
    part.replace(/^\*|\*$/g, "").trim()
  ) as [string, string] | [string]; // Clean and trim each part

  // Identify the special word (previously within asterisks)
  const specialIndex = parts.findIndex(
    (part) => part.startsWith("*") && part.endsWith("*")
  );
  const special = specialIndex !== -1 ? cleanedParts[specialIndex] : null;

  // If there's no special word, set the rest as all words and position as -1
  if (special === null) {
    return {
      special: null,
      rest: input.split(/\s+/).join(""),
      position: -1,
    };
  }

  // Remove the special word from the array
  cleanedParts.splice(specialIndex, 1);

  // Determine the position of the special word within the context of the other words
  const position =
    specialIndex === 0 ? 0 : specialIndex >= cleanedParts.length ? 2 : 1;

  return {
    special: special,
    rest: cleanedParts,
    position: position,
  };
}

// const redHatDisplay = Red_Hat_Display({
//   weight: "600",
//   preload: true
// })

export async function generateMetadata(
  {
    params: { promoter },
    searchParams,
  }: {
    params: {
      promoter: string;
    };
    searchParams: unknown;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!hasLanguage(searchParams)) throw new Error("No Language Provided");
  const language = searchParams.language;

  return {
    title: `${promoter.charAt(0).toUpperCase()}${promoter.substring(
      1
    )}'s ${language.charAt(0).toUpperCase()}${language.substring(1)} Poster`,
  };
}

function getData() {
  return {
    english: {
      logo: logos.english,
      title: ["Your Pocket", "*Doctor*"],
      screenshotImage: screenshots.english,
      scanText: `Scan this code to download the app.`,
    },
    hindi: {
      logo: logos.hindi,
      title: ["आपकी जेब में रहने", "वाला *डॉक्टर*"],
      screenshotImage: screenshots.hindi,
      scanText: `इस कोड को स्कैन करें और ऐप डाउनलोड करें।.`,
    },
    punjabi: {
      logo: logos.punjabi,
      title: ["ਤੁਹਾਡੀ ਜੇਬ ਵਿਚ ਰਹਿਣ", "ਵਾਲਾ *ਡਾਕਟਰ*"],
      screenshotImage: screenshots.punjabi,
      scanText: `ਇਹ ਕੋਡ ਸਕੈਨ ਕਰੋ ਅਤੇ ਐਪ ਡਾਉਨਲੋਡ ਕਰੋ।`,
    },
  };
}

const styles = `
  nextjs-portal {
    display: none !important;
  }
`;

export default function Poster({
  params: { promoter },
  searchParams,
}: {
  params: {
    promoter: string;
  };
  searchParams: unknown;
}) {
  if (!hasLanguage(searchParams)) throw new Error("No Language Provided");
  const language = searchParams.language;
  if (!Object.keys(getData()).includes(language.toLowerCase()))
    throw new Error("Invalid Language Provided");
  const data =
    getData()[language.toLowerCase() as keyof ReturnType<typeof getData>];
  return (
    <>
      <div id="service-data"></div>
      <main className="relative w-screen h-screen overflow-hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: styles,
          }}
        ></style>
        <div
          className="absolute"
          style={{
            top: `${LOGO_TOP_PERCENTAGE}vh`,
            left: `${LOGO_LEFT_PERCENTAGE}vw`,
            height: `${LOGO_HEIGHT_PERCENTAGE}vh`,
            aspectRatio: "1626 / 278",
          }}
        >
          <Image
            src={data.logo}
            alt={`${language} logo`}
            width={307.57 * 2}
            height={52.586 * 2}
            // fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="absolute"
          style={{
            top: `${ICON_TOP_PERCENTAGE}vh`,
            right: `${ICON_RIGHT_PERCENTAGE}vw`,
            height: `${ICON_HEIGHT_PERCENTAGE}vh`,
            aspectRatio: "1 / 1",
          }}
        >
          <Image
            src={iconLogo}
            alt={`icon logo`}
            width={86.344 * 2}
            height={86.344 * 2}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className={cn(
            "absolute text-right flex flex-col items-end justify-start text-[39.5px]"
          )}
          style={{
            right: `${TITLE_RIGHT_PERCENTAGE}vw`,
            top: `${TITLE_TOP_PERCENTAGE}vh`,
            fontSynthesis: "none",
            fontKerning: "none",
            fontVariantLigatures: "none",
            fontFeatureSettings:
              '"kern" 0, "calt" 0, "liga" 0, "clig" 0, "dlig" 0, "hlig" 0',
            WebkitFontSmoothing: "subpixel-antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "geometricPrecision",
            whiteSpace: "normal",
            fontWeight: "600",
            fontFamily: (() => {
              switch (language.toLowerCase()) {
                case "english":
                  return '"Poppins", sans-serif';
                case "hindi":
                  return '"Noto Sans Devanagari", sans-serif';
                case "punjabi":
                  return '"Noto Sans Gurmukhi", sans-serif';
                default:
                  return '"Poppins", sans-serif';
              }
            })(),
            // ...redHatDisplay.style
          }}
        >
          {data.title.map((segment, i) => {
            const details = extractDetails(segment);
            if (details.special) {
              switch (details.position) {
                case 0:
                  return (
                    <h1
                      key={`title-sement-${i}`}
                      className={cn(
                        i === 1 ? "-mt-[8px] font-extrabold" : "font-extrabold"
                      )}
                    >
                      <span className="text-[#ce0000] underline">
                        {details.special}
                      </span>
                      {` `}
                      {details.rest.join(" ")}
                    </h1>
                  );
                case 1:
                  return (
                    <h1
                      key={`title-sement-${i}`}
                      className={cn(i === 1 ? "-mt-[8px]" : "")}
                    >
                      {details.rest[0]}
                      {` `}
                      <span className="text-[#ce0000] underline">
                        {details.special}
                      </span>
                      {` `}
                      {details.rest[1]}
                    </h1>
                  );
                case 2:
                  return (
                    <h1
                      key={`title-sement-${i}`}
                      className={cn(i === 1 ? "-mt-[8px]" : "")}
                    >
                      {details.rest.join(" ")}
                      {` `}
                      <span className="text-[#ce0000] underline">
                        {details.special}
                      </span>
                    </h1>
                  );
                default:
                  return (
                    <h1
                      key={`title-sement-${i}`}
                      className={cn(i === 1 ? "-mt-[8px]" : "")}
                    ></h1>
                  );
              }
            } else {
              return (
                <h1
                  key={`title-sement-${i}`}
                  className={cn(i === 1 ? "-mt-[8px]" : "")}
                >
                  {segment}
                </h1>
              );
            }
          })}
        </div>
        {/* Blob */}
        <div className="absolute -left-[41%] -bottom-[27%] aspect-[446/532] w-[390px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height={"100%"}
            preserveAspectRatio="xMidYMid meet"
            version="1"
            viewBox="33.8 -20.6 446.8 532.6"
            width={"100%"}
            zoomAndPan="magnify"
          >
            <g id="change1_1">
              <path
                d="M427.6,475.2c42.3-32.9,53-171.4-34.1-247.1s-120.1-120.9-160-174.1C177.7-20.6,52.8-2.9,43.3,171.3 s1.9,285.8,90.9,301s68.1-34.1,132.5-24.6C331,457.1,380.3,512,427.6,475.2z"
                fill="#ce0000"
              />
            </g>
          </svg>
        </div>
        <div
          className="absolute"
          style={{
            top: `${SHADOW_TOP_PERCENTAGE}vh`,
            left: `${SHADOW_LEFT_PERCENTAGE}vw`,
            height: `${SHADOW_HEIGHT_PERCENTAGE}vh`,
            aspectRatio: "1182 / 411",
            opacity: 0.55,
          }}
        >
          <img
            style={{
              objectFit: "contain",
              transform: "translate(-50%, -50%) rotate(206deg)",
            }}
            src={"/shadow.png"}
            alt={"shadow"}
            // fill
          />
        </div>
        <div
          id="SWWo9U9rM19J5GF9"
          style={{
            paddingTop: "238.867%",
            transform: "rotate(-5.43157deg)",
            userSelect: "text",
            width: "100px",
            marginLeft: "6%",
            background: "transparent",
          }}
        >
          <div
            id="FuDX5QBiTklo9en7"
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              userSelect: "text",
              background: "transparent",
            }}
          >
            <svg
              id="eAFhOErOUFEt89zA"
              viewBox="0 0 206.3 408.2"
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
                overflow: "hidden",
                position: "absolute",
                top: "0%",
                left: "0%",
                background: "transparent",
                userSelect: "text",
              }}
            >
              <g
                id="EA7V8FGFioBR8MuV"
                style={{ transform: "scale(1, 1)", userSelect: "text" }}
              >
                <path
                  id="vJRPdFSiUgzEnYiL"
                  d="M174.19999695,2 L32.09999084,2 C16.69999123,2 4.19999123,14.5 4.19999123,29.89999962 L4.19999123,378.19998741 C4.19999123,393.59998703 16.69999123,406.09998703 32.09999084,406.09998703 L174.19999695,406.09998703 C189.59999657,406.09998703 202.09999657,393.59998703 202.09999657,378.19998741 L202.09999657,29.89999962 C202.09999657,14.5 189.59999657,2 174.19999695,2 Z M126.89999771,14.80000019 C128.29999769,14.80000019 129.39999771,15.90000021 129.39999771,17.30000019 C129.39999771,18.70000017 128.29999769,19.80000019 126.89999771,19.80000019 C125.49999774,19.80000019 124.39999771,18.70000017 124.39999771,17.30000019 C124.39999771,15.90000021 125.59999776,14.80000019 126.89999771,14.80000019 Z M89.99999619,15.6000002 L113.99999619,15.6000002 C114.89999616,15.6000002 115.69999623,16.30000019 115.69999623,17.30000025 C115.69999623,18.30000031 114.89999622,19.0000003 113.99999619,19.0000003 L89.99999619,19.0000003 C89.09999621,19.0000003 88.29999614,18.30000031 88.29999614,17.30000025 C88.29999614,16.30000019 89.09999615,15.6000002 89.99999619,15.6000002 Z M191.89999771,379.80001241 C191.89999771,388.90001279 184.49999762,396.30001241 175.39999771,396.30001241 L31.09999466,396.30001241 C21.99999428,396.30001241 14.59999466,388.90001231 14.59999466,379.80001241 L14.59999466,28.80001241 C14.59999466,19.70001203 21.99999475,12.30001241 31.09999466,12.30001241 L52.59999466,12.30001241 L52.59999466,16.80001241 C52.59999466,21.90001231 56.79999447,26.1000126 61.89999485,26.1000126 L144.5999918,26.1000126 C149.6999917,26.1000126 153.89999199,21.90001279 153.89999199,16.80001241 L153.89999199,12.30001241 L175.29999161,12.30001241 C184.39999199,12.30001241 191.79999161,19.70001251 191.79999161,28.80001241 L191.79999161,379.80001241 Z"
                  style={{
                    fill: "rgb(0, 0, 0)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <foreignObject
                  id="c8eYCm0MmKK2bugD"
                  style={{
                    width: "206.3px",
                    height: "408.2px",
                    userSelect: "text",
                  }}
                >
                  <div
                    id="CjJmhAFomxm1vOhO"
                    style={{
                      clipPath: `path("M 175.3 12.3 L 153.9 12.3 L 153.9 16.8 C 153.9 21.9 149.7 26.1 144.6 26.1 L 62 26.1 C 56.9 26.1 52.7 21.9 52.7 16.8 L 52.7 12.3 L 31.1 12.3 C 22 12.3 14.6 19.7 14.6 28.8 L 14.6 379.8 C 14.6 388.9 22 396.3 31.1 396.3 L 175.3 396.3 C 184.4 396.3 191.8 388.9 191.8 379.8 L 191.8 28.8 C 191.9 19.7 184.5 12.3 175.3 12.3 Z")`,
                      userSelect: "text",
                    }}
                  >
                    <div id="zfXu45ydVKUWFUnI">
                      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                      <Image
                        src={data.screenshotImage}
                        alt={"screenshot"}
                        loading="lazy"
                        style={{
                          transform:
                            "translate(9.29711px, 10.5602px) rotate(0deg)",
                          transformOrigin: "93.1819px 199.675px",
                          width: "186.364px",
                          height: "399.351px",
                          display: "block",
                          opacity: 1,
                          objectFit: "fill",
                          userSelect: "text",
                        }}
                      />
                    </div>
                  </div>
                </foreignObject>
                <path
                  id="D1gQDmM9naO3Yivx"
                  d="M114,15.60000038 L90,15.60000038 C89.10000002,15.60000038 88.29999995,16.30000037 88.29999995,17.30000043 C88.29999995,18.30000049 89.09999996,19.00000048 90,19.00000048 L114,19.00000048 C114.89999998,19.00000048 115.70000005,18.30000049 115.70000005,17.30000043 C115.70000005,16.30000037 114.90000004,15.60000038 114,15.60000038 Z"
                  style={{
                    fill: "rgb(96, 96, 96)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="bVicnfCdgIgFN9jS"
                  d="M126.90000153,14.80000019 C126.00646995,14.79944832 125.18057651,15.2758248 124.73365133,16.049554 C124.28672615,16.8232832 124.28672615,17.77671623 124.73365133,18.55044543 C125.18057651,19.32417462 126.00646995,19.80055111 126.90000153,19.79999924 C127.79353311,19.80055111 128.61942655,19.32417462 129.06635172,18.55044543 C129.5132769,17.77671623 129.5132769,16.8232832 129.06635172,16.049554 C128.61942655,15.2758248 127.79353311,14.79944832 126.90000153,14.80000019 Z"
                  style={{
                    fill: "rgb(96, 96, 96)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="NUhlRX3T1VnSly94"
                  d="M0,56.09999847 L0,68.59999847 C0,69.79999852 1,70.79999852 2.20000005,70.79999852 L2.20000005,53.99999928 C1,53.99999928 0,54.89999926 0,56.09999919 Z"
                  style={{
                    fill: "rgb(184, 184, 184)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="p7CWHjDvPrzrpPKa"
                  d="M0,85.40000153 L0,111.40000153 C0,112.60000157 1,113.60000157 2.20000005,113.60000157 L2.20000005,83.30000234 C1,83.30000234 0,84.20000231 0,85.40000224 Z"
                  style={{
                    fill: "rgb(184, 184, 184)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="h3yqqSXlNH70ggFp"
                  d="M0,122.40000153 L0,148.40000153 C0,149.60000157 1,150.60000157 2.20000005,150.60000157 L2.20000005,120.20000196 C1,120.20000196 0,121.20000196 0,122.400002 Z"
                  style={{
                    fill: "rgb(184, 184, 184)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="OIyEdQ5dEkjD5lfx"
                  d="M204.1000061,93.30000305 L204.1000061,142.00000381 C205.30000615,142.00000381 206.30000615,141.00000381 206.30000615,139.80000377 L206.30000615,95.50000453 C206.30000615,94.30000448 205.30000615,93.30000448 204.1000061,93.30000448 Z"
                  style={{
                    fill: "rgb(184, 184, 184)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
                <path
                  id="XZekBIBvKhYctU7A"
                  d="M204.1000061,93.30000305 L204.1000061,29.90000153 C204.1000061,27.80000162 203.9000061,25.80000162 203.50000608,23.90000153 C203.30000608,22.90000153 203.10000607,22.00000155 202.80000609,21.00000143 C202.40000609,19.60000145 201.80000609,18.20000148 201.20000607,16.90000153 C200.80000606,16.00000155 200.30000609,15.20000148 199.80000609,14.40000153 C199.30000609,13.60000157 198.80000609,12.8000015 198.20000607,12.00000143 C197.30000609,10.80000138 196.40000612,9.80000138 195.40000612,8.70000148 C194.70000613,8.00000149 194.00000614,7.40000153 193.30000621,6.8000015 C188.1000064,2.50000131 181.50000602,0.00000131 174.30000621,0.00000131 L32.10000926,0.00000131 C24.90000945,0.00000131 18.20000964,2.60000122 13.10000926,6.8000015 C12.40000927,7.40000153 11.70000929,8.10000145 11.00000936,8.70000148 C10.00000936,9.70000148 9.00000936,10.80000138 8.20000941,12.00000143 C7.60000938,12.80000144 7.10000938,13.60000145 6.60000938,14.40000153 C6.10000938,15.2000016 5.60000938,16.10000157 5.20000941,16.90000153 C4.50000942,18.3000015 4.00000936,19.60000157 3.50000936,21.00000143 C3.20000935,22.00000143 3.00000936,22.90000141 2.80000937,23.90000153 C2.40000936,25.8000015 2.20000935,27.90000153 2.20000935,29.90000153 L2.20000935,378.19998932 C2.20000935,394.69998932 15.60000896,408.09998894 32.10000896,408.09998894 L174.20001507,408.09998894 C190.70001507,408.09998894 204.10001469,394.69998932 204.10001469,378.19998932 L204.10001469,93.29999542 Z M202.10001469,93.29999542 L202.10001469,378.29999542 C202.10001469,393.69999504 189.60001469,406.19999504 174.20001507,406.19999504 L32.10000896,406.19999504 C16.70000935,406.19999504 4.20000935,393.69999504 4.20000935,378.29999542 L4.20000935,30.00000763 C4.20000935,14.50000763 16.70000935,2.00000763 32.10000896,2.00000763 L174.20001507,2.00000763 C189.60001469,2.00000763 202.10001469,14.50000763 202.10001469,29.90000725 L202.10001469,93.30000877 Z"
                  style={{
                    fill: "rgb(233, 233, 233)",
                    opacity: 1,
                    userSelect: "text",
                  }}
                ></path>
              </g>
            </svg>
          </div>
        </div>
        {language !== "english" && (
          <h2
            className={cn(
              "absolute left-[50%] w-[180px] right-[50%] text-center -translate-x-[50%] -translate-y-[50%]"
            )}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, calc(-50% - 90px))",
              height: "max-content",
              marginTop: 5,
              lineHeight: 1,
              fontWeight: "700",
              fontFamily: '"Poppins", sans-serif',
              // ...redHatDisplay.style
            }}
          >
            Swasthya Samadhan
          </h2>
        )}
        <div
          className="absolute"
          style={{
            bottom: `${DOCTOR_BOTTOM_PERCENTAGE}vh`,
            right: `${DOCTOR_RIGHT_PERCENTAGE}vw`,
            height: `${DOCTOR_HEIGHT_PERCENTAGE}vh`,
            aspectRatio: "439 / 329",
          }}
        >
          <Image
            src={doctorImg}
            alt={`Doctor`}
            // quality={15}
            // fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h2
          className={cn(
            "absolute left-[50%] w-[150px] font-extrabold right-[50%] text-center -translate-x-[50%] -translate-y-[50%]"
          )}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, calc(100px + -50%))",
            height: "max-content",
            marginTop: 5,
            lineHeight: 1,
            fontWeight: "700",
            fontFamily: (() => {
              switch (language.toLowerCase()) {
                case "english":
                  return '"Poppins", sans-serif';
                case "hindi":
                  return '"Noto Sans Devanagari", sans-serif';
                case "punjabi":
                  return '"Noto Sans Gurmukhi", sans-serif';
                default:
                  return '"Poppins", sans-serif';
              }
            })(),
            // ...redHatDisplay.style
          }}
        >
          {data.scanText}
        </h2>
        <QR promoter={promoter} />
      </main>
    </>
  );
}

type LanguageContaining = {
  language: string;
};

const hasLanguage = (obj: unknown): obj is LanguageContaining => {
  return typeof obj === "object" && obj !== null && "language" in obj;
};

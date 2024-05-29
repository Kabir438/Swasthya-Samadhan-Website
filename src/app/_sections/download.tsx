import Android from "@/components/badges/android";
import IOS from "@/components/badges/ios";
import { Button } from "@/components/ui/button";
import WavyBackground from "@/components/wavy";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

export default function DownloadSection() {
  const small = useMediaQuery("(max-width: 750px)");
  const smaller = useMediaQuery("(max-width: 500px)");
  const smallest = useMediaQuery("(max-width: 320px)");
  const textSmaller = useMediaQuery("(max-width: 450px)");
  return (
    <div
      id="last-section"
      className={cn(
        "w-screen min-h-[100vh] max-h-[100vh] relative bg-transparent h-screen py-8 flex flex-col items-start justify-center",
        smaller ? "px-4" : small ? "px-12" : "px-24"
      )}
    >
      <WavyBackground>
        <h1 className={cn("mb-5 text-5xl", smallest ? "text-3xl" : (textSmaller ? "text-4xl" : ""))}>Download the App</h1>
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            smaller
              ? ("flex-col min-w-[45vw] w-max h-max items-start")
              : "h-14 w-max",
              smallest ? "min-w-[50vw]" : ""
          )}
        >
          <Button
            className={cn(
              "border-[0px] bg-transparent w-max p-[0px] min-w-max min-h-max h-full",
              smaller ? "min-w-full" : ""
            )}
          >
            <Android
              style={
                smaller
                  ? {
                      maxWidth: "100%",
                      minWidth: "100%",
                      // maxHeight: "100%",
                      height: "100%",
                    }
                  : {
                      maxHeight: "100%",
                      minHeight: "100%",
                      maxWidth: "100%",
                      width: "100%",
                    }
              }
              width={"135"}
              height={"40"}
            />
          </Button>
          {/* <Button
            className={cn(
              "border-[0px] bg-transparent w-max p-[0px] min-w-max min-h-max h-full",
              smaller ? "min-w-full" : ""
            )}
          >
            <IOS
              style={
                smaller
                  ? {
                      maxWidth: "100%",
                      minWidth: "100%",
                      // maxHeight: "100%",
                      height: "100%",
                    }
                  : {
                      maxHeight: "100%",
                      minHeight: "100%",
                      maxWidth: "100%",
                      width: "100%",
                    }
              }
            />
          </Button> */}
        </div>
      </WavyBackground>
    </div>
  );
}

import { PresentationControls } from "@react-three/drei";

export default function PresentationWrapper({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <PresentationControls
      global={false} // Spin globally or by dragging the model
      cursor={true} // Whether to toggle cursor style on drag
      snap // Snap-back to center (can also be a spring config)
      // speed={1} // Speed factor
      // zoom={1} // Zoom factor when half the polar-max is reached
      // rotation={[0, 0, 0]} // Default rotation
      // polar={[0, Math.PI / 2]} // Vertical limits
      // azimuth={[-Infinity, Infinity]} // Horizontal limits
      config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      // //   domElement={events.connected} // The DOM element events for this controller will attach to
      enabled={enabled}
      // snap
      // global
      zoom={0.8}
      // cursor
      // rotation={[0, -Math.PI / 4, 0]}
      // polar={[0, Math.PI / 4]}
      // azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      {children}
    </PresentationControls>
    // <>{children}</>
  );
}

import popcornLogo from "../assets/popcorn-transparent.png";

export default function Brand() {
  return (
    <div className="brand-layer absolute flex flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center">
        <img
          src={popcornLogo}
          alt="PopChoice popcorn logo"
          className="h-full w-full object-contain"
        />
      </div>

      <h1 className="mb-1 text-2xl font-bold tracking-tight text-white">
        PopChoice
      </h1>
    </div>
  );
}
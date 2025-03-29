import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-sky-800 text-white font-bold p-4">
      <h1 className="text-2xl">Image Processing</h1>

      <div>
        <a href="https://github.com/guilhermepereira2917/image-processing" target="_blank">
          <SiGithub className="cursor-pointer text-2xl" />
        </a>
      </div>
    </header>
  );
}
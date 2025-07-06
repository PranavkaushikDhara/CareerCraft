import { TiTickOutline } from "react-icons/ti";
interface AuthProps {
  children: React.ReactNode;
}
const AuthLayout = (props: AuthProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-center p-6 gap-8 md:flex-row md:justify-around max-w-7xl mx-auto">
      <div className="hidden md:flex flex-col gap-6 items-start justify-center md:flex-1 p-4">
        <h1 className="text-CareerCraftWhite text-5xl font-bold leading-tight">
          Streamline Your Career Success Tools
        </h1>
        <p className="text-CareerCraftText text-base leading-relaxed">
          Access all your professional resources in one place. Enhance your
          productivity and career growth with our integrated platform.
        </p>
        <ul className="flex flex-col text-CareerCraftText gap-3">
          <li className="flex gap-3 items-center">
            <TiTickOutline size={20} />
            <span>Advanced resume builder and tracking</span>
          </li>
          <li className="flex gap-3 items-center">
            <TiTickOutline size={20} />
            <span>Integrated job application management</span>
          </li>
          <li className="flex gap-3 items-center">
            <TiTickOutline size={20} />
            <span>Professional network expansion tools</span>
          </li>
        </ul>
      </div>
      {props.children}
    </div>
  );
};

export default AuthLayout;

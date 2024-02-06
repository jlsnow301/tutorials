import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { CypressHomeIcon } from "../icons/cypressHomeIcon";

type Props = {
  className?: string;
  myWorkspaceId?: string;
};

export function NativeNavigation(props: Props) {
  const { className, myWorkspaceId } = props;

  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7 transition-all"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My workspace</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

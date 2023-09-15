import React, { useCallback, useState } from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import NavbarItem from "@theme/NavbarItem";
import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from "@theme/NavbarItem/DropdownNavbarItem";
import { useClickOutside } from "@site/src/utils/useClickOutside";

function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  onClick,
  label,
  children,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  const callback = useCallback(() => setShowDropdown(false), []);

  const dropdownRef = useClickOutside<HTMLDivElement>(callback);

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div ref={dropdownRef} className="group">
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : "#"}
        className={clsx(
          "peer flex items-center font-bold text-gray-900 dark:text-gray-50 group-hover:text-purple-500 dark:group-hover:text-gray-50 group-hover:underline",
          className
        )}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
        label={
          <>
            {children ?? label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M7,10L12,15L17,10H7Z" className="fill-current" />
            </svg>
          </>
        }
      />
      <div className="absolute shadow-2xl bg-gray-150 dark:bg-gray-700 p-3 gap-3 hidden group-hover:flex peer-aria-expanded:flex flex-col w-36">
        {items.map((childItemProps, i) => (
          <NavbarItem isDropdownItem {...childItemProps} key={i} />
        ))}
      </div>
    </div>
  );
}

function DropdownNavbarItemMobile({
  items,
  className,
  position,
  onClick,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  return (
    <>
      <NavbarNavLink
        role="button"
        className={clsx("font-bold text-gray-900 dark:text-gray-50", className)}
        {...props}
      >
        {props.children ?? props.label}
      </NavbarNavLink>

      {items.map((childItemProps, i) => (
        <NavbarItem
          mobile
          isDropdownItem
          onClick={onClick}
          className="ml-5"
          {...childItemProps}
          key={i}
        />
      ))}
    </>
  );
}

export default function DropdownNavbarItem({
  mobile = false,
  ...props
}: Props) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
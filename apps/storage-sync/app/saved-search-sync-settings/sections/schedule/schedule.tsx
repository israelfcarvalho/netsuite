import React from "react";
import NextLink from "next/link";

import { Collapsible, Link } from "@workspace/ui/components";

const linkLabel = 'Script Deployment'

export const ScheduleSection: React.FC<{link: string}> = ({
  link
}) => {

  return (
    <Collapsible className="pr-8" title="Schedule" initialState="open">
      <h3 className="text-xs text-light-neutral-100 font-semibold">
        {linkLabel}
      </h3>
      
      <NextLink href={link} passHref legacyBehavior>
        <Link
          label={linkLabel} 
          target="_blank"
          enableCopy={!!link}
        >
          {link}
        </Link>
      </NextLink>
    </Collapsible>
  )
}


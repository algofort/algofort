import React from 'react';

export default function StaticLink({ href, children, ...props }) {
  return <a href={href} {...props}>{children}</a>;
}

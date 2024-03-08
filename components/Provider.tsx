"use client"

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";

const Provider = ({children}: {children: ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient())

  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Provider;
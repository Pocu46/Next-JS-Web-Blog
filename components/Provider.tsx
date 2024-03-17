"use client"

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";
import {queryClient} from "@/utils/http";

const Provider = ({children}: {children: ReactNode}) => {
  // const [queryClient] = useState(() => new QueryClient())
  const [queryClientState] = useState(queryClient)

  return(
    <QueryClientProvider client={queryClientState}>
      {children}
    </QueryClientProvider>
  )
}

export default Provider;
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, NotesHttpResponse } from "@/lib/api";

export default async function Notes(){
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<NotesHttpResponse>({
    queryKey:["notes"],
    queryFn: () => fetchNotes(1, "")
  })

  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient/>
    </HydrationBoundary>
  )
}


"use client";

import { getSingleNote } from "@/lib/api";
import css from "./NoteDetails.client.module.css"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";


const NoteDetailsClient = () =>{
	const {id} = useParams<{id: string}>();

	const {data: note} = useQuery({
		queryKey: ["note", id],
		queryFn: () => getSingleNote(id),
		refetchOnMount: false,
	})

    return(
        <main className={css.main}>	
	<div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>{note.title}</h2>
		  </div>
		  <p className={css.tag}>{note.tag}</p>
		  <p className={css.content}>{note.content}</p>
		  <p className={css.date}>{note.createdAt}</p>
		</div>
	</div>
</main>

    )
};

export default NoteDetailsClient;
"use client"

import {useState } from 'react'
import SearchBox from "@/components/SearchBox/SearchBox"
import css from "./NotesPage.module.css"
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchNotes, type NotesHttpResponse } from '@/lib/api'
import Pagination from '@/components/Pagination/Pagination'
import NoteList from '@/components/NoteList/NoteList'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import { useDebounce } from 'use-debounce'


export default function NotesClient() {

const [currentPage, setCurrentPage] = useState(1);
const [searchText, setSearchText] = useState("")

const [handleSearch] = useDebounce((value: string) =>{
  setSearchText(value);
  setCurrentPage(1);
}, 300);

const {data, isLoading} = useQuery<NotesHttpResponse>({
  queryKey: ["notes", currentPage, searchText],
  queryFn: ()=> fetchNotes(currentPage, searchText),
  placeholderData: keepPreviousData
});

const notes = data?.notes ?? []
const totalPages = data?.totalPages ?? 0;

const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch}/>
        {totalPages>1 && (<Pagination 
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={setCurrentPage}

                          />)}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>

      {data && !isLoading && <NoteList notes={notes}/>}
      {data && isModalOpen &&(
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}

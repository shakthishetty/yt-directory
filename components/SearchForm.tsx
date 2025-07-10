import { Search } from 'lucide-react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
const SearchForm = ({query}:{query?:string}) => {
   
   
  return (
    <Form action="/" className="search-form" scroll={false}>
         <input
           name='query'
           defaultValue={query}
           className='search-input'
           placeholder='Search Startups'
         />
        
        <div className='flex gap-2'>
             {query && <SearchFormReset/>}
             <button type='submit' className='search-btn text-white'>
                   <Search className='size-5'/>
             </button>
                
           
        </div>
    </Form>
  )
}

export default SearchForm
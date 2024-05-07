import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard'

export default function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        catergory: 'uncategorized',
    });
    console.log(sideBarData)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort')==='null' ? sideBarData.sort : urlParams.get('sort');
        const catergoryFromUrl = urlParams.get('catergory')==='null' ? sideBarData.catergory : urlParams.get('catergory');
        if (searchTermFromUrl || sortFromUrl || catergoryFromUrl){
            setSideBarData({
                ...sideBarData,
                searchTerm: searchTermFromUrl,
                sort:sortFromUrl,
                catergory: catergoryFromUrl,
            })

        }
        const fetchPosts = async() => {
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
           console.log(searchQuery);
            if(!res.ok){
                setLoading(false)
                return;
            }
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setPosts(data.post)
                setLoading(false)
                if(data.post.length === 9){
                    setShowMore(true)
                }else{
                    setShowMore(false);
                }
            }
        }

        fetchPosts();

    }, [location.search]);

    const handleChange = (e) =>{
        if(e.target.id === 'searchTerm'){
            setSideBarData({ ...sideBarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSideBarData({ ...sideBarData, sort: order})
        }
        if(e.target.id === 'catergory'){
            const catergory = e.target.value || 'uncategorized'
            setSideBarData({ ...sideBarData, catergory});
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('catergory', sideBarData.catergory);
        console.log("ggggg",sideBarData.catergory);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
        
    }
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.post]);
            if(data.post.length === 9 ){
                setShowMore(true);
            }else{
                setShowMore(false);
            }


        }

    }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <TextInput placeholder='Search...'
                id='searchTerm' type='text'
                value={sideBarData.searchTerm}
                onChange={handleChange} />
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <Select onChange={handleChange} value={sideBarData.sort} id='sort'>
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                </Select>
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Category:</label>
                 <Select onChange={handleChange} value={sideBarData.catergory} id='catergory'>
                    <option value="uncategorized">Uncategorized</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                    <option value="javascript">JavaScript</option>
                </Select>
            </div>
            <Button type='submit' outline gradientDuoTone='purpleToPink'>
                Apply Filter
            </Button>

        </form>

      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
            {
                !loading && posts.length === 0 && (<p className='text-gray-500 text-xl'>No posts found</p>)
            }
            {
                loading && (
                    <p className='text-xl text-gray-500'>Loading...</p>
                )
            }
            {
                !loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />

                )
            }
            {
                showMore && <button className='text-teal-500 text-lg hover:underline p-7 w-full' onClick={handleShowMore}>
                    Show More
                </button>
            }
        </div>
      </div>
    </div>
  )
}

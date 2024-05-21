import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function DashAdd() {
  const { currentUser } = useSelector((state) => state.user);
  const [userAdds, setUserAdds] = useState([]);
  //const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [AddIdToDelete,setAddIdToDelete] = useState('')
  //console.log(userPosts);
  //console.log(currentUser._id);
  useEffect(() => {
    const fetchAdds = async () => {
      try {
        const res = await fetch('api/add/getadds');
        
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserAdds(data);
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchAdds();
    }
  }, [currentUser._id]);
  const handleDeleteAdd = async () =>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/add/deleteadd/${AddIdToDelete}/${currentUser._id}`,
      {
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        setUserAdds((prevAdds) =>
          prevAdds.filter((add) => add._id !== AddIdToDelete)
        );
      
      }

    } catch (error) {
      console.log(error.message)
    }
  };
  

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userAdds.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Add image</Table.HeadCell>
              <Table.HeadCell>Add title</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>delete</Table.HeadCell>
              <Table.HeadCell>
                <span>edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userAdds.map((add) =>(
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(add.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                      
                          <img
                              src={add.image}
                              alt={add.title}
                              className='w-20 h-20 object-cover bg-gray-500' />
                      
                  </Table.Cell>
                  <Table.Cell>
                    {add.title}
                  </Table.Cell>
                  <Table.Cell>{add.content}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() =>{
                      setShowModal(true);
                      setAddIdToDelete(add._id);
                    }
                    } className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-add/${add._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          
        </>
      ) : (
        <p>You have no add yet</p>
      )}
       <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-500'>Are you sure you want to delete this add?</h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleDeleteAdd}>Yes, I'm sure</Button>
                        <Button color='gray' onClick={() => setShowModal(false)}>No, cancle</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  );
}

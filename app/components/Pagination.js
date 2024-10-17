// components/PaginationComponent.js
import { Pagination } from '@nextui-org/react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination
            loop
            showControls
            total={totalPages}
            page={currentPage}
            onChange={onPageChange}
            classNames={{
                wrapper: "",
                item: "",
                cursor:
                    "bg-lime-500 text-white font-bold",
            }}
        />
    );
};

export default PaginationComponent;


/**
 * How to use ?
 */

// const [currentPage, setCurrentPage] = useState(1);
// const blogsPerPage = 5;

// const indexOfLastBlog = currentPage * blogsPerPage; // index ตัวสุดท้ายของหน้า
// const indexOfFirstBlog = indexOfLastBlog - blogsPerPage; // index ตัวแรกของหน้า
// const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog); // blog ที่เราต้องการแสดง


{/* <PaginationComponent
    currentPage={currentPage}
    totalPages={Math.ceil(blogs.length / blogsPerPage)}
    onPageChange={(page) => setCurrentPage(page)}
/> */}


// more : [https://nextui.org/docs/components/pagination#installation]
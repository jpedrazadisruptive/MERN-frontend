import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import ContentList from '../../components/ContentList/ContentList';
import AddContentModal from '../../components/AddContentModal/AddContentModal';
import CountsDisplay from '../../components/CountsDisplay/CountsDisplay';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import './Home.css';

const Home = () => {
  const [contents, setContents] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchContentName, setSearchContentName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  const { token, email, userId, role } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(token && email);

  useEffect(() => {
    fetchContents(1);
    fetchCategories();
  }, []);

  const fetchContents = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contents`, {
        params: { page, limit: 10 },
      });
      if (page === 1) {
        setContents(response.data.contents);
      } else {
        setContents((prevContents) => [...prevContents, ...response.data.contents]);
      }
      setCounts(response.data.counts);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleContentNameChange = (e) => {
    setSearchContentName(e.target.value);
  };

  const filteredContents = contents.filter((content) => {
    const matchesCategory = content.category.name.toLowerCase().includes(searchCategory.toLowerCase());
    const matchesContentName = content.title.toLowerCase().includes(searchContentName.toLowerCase());
    return matchesCategory && matchesContentName;
  });

  const handleEdit = (content) => {
    setContentToEdit(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContentToEdit(null);
  };

  const handleSubmitContent = async (contentData) => {
    try {
      if (contentToEdit) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/contents/${contentToEdit._id}`,
          { ...contentData, creatorId: userId, categoryId: contentData.categoryId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/contents`,
          { ...contentData, creatorId: userId, categoryId: contentData.categoryId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contents`, {
        params: { page: 1, limit: 10 },
      });
      setContents(response.data.contents);
      setCounts(response.data.counts);
      setTotalPages(response.data.pagination.totalPages);
      setCurrentPage(1);
      setIsModalOpen(false);
      setContentToEdit(null);
    } catch (error) {
      console.error('Failed to submit content:', error);
    }
  };

  const handleDeleteContent = async (contentId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contents/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setContents((prevContents) => prevContents.filter((content) => content._id !== contentId));
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchContents(nextPage);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="container">
        <CountsDisplay counts={counts} />
        <SearchFilters
          searchCategory={searchCategory}
          handleCategoryChange={handleCategoryChange}
          searchContentName={searchContentName}
          handleContentNameChange={handleContentNameChange}
          role={role}
          setIsModalOpen={setIsModalOpen}
        />
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <ContentList contents={filteredContents} onEdit={handleEdit} onDelete={handleDeleteContent} userId={userId} role={role} />
        {currentPage < totalPages && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </main>
      <AddContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitContent}
        contentToEdit={contentToEdit}
        categories={categories}
      />
    </div>
  );
};

export default Home;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostView from './pages/PostView';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-content-light text-content-main">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostView />} />
        </Routes>
      </main>
    </div>
  );
}

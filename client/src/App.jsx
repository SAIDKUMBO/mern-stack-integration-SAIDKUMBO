import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";
import CreatePost from './pages/CreatePost';
import PostView from './pages/PostView';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return (
      <div className="min-h-screen flex flex-col bg-content-light text-content-main">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
            />
            <Route
              path="/create"
              element={
                <>
                  <SignedIn>
                    <CreatePost />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route 
              path="/posts/:id" 
              element={<PostView />} 
            />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
  );
}

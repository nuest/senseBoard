import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'

export default function App(){

  return(
    <ErrorBoundary>
      <Home/>
    </ErrorBoundary>
  )
}


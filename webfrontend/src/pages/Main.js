import React from 'react';
import logo from '../assets/logo.svg';

export default function Main({match}) {
  return <h1>hi {match.params.id}</h1>;
}

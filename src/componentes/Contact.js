import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Contact() {
  const [useParams] = useSearchParams();
  // console.log(useParams.get("id"),useParams.get("name"));
  console.log(useParams.get("id"));

  return (
    <div>
        <h1>Contact page</h1>
    </div>
  )
}

export default Contact
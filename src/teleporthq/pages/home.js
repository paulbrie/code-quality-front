import React from 'react'

import { Helmet } from 'react-helmet'

import styles from './home.module.css'

const Home = () => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>Monaco Editor Working</title>
        <meta property="og:title" content="Monaco Editor Working" />
      </Helmet>
      <div className={styles['container1']}>
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1642186733710-dcdb4c1b4d1c?ixid=Mnw5MTMyMXwwfDF8YWxsfDE0fHx8fHx8Mnx8MTY0MjMyMzQzOA&amp;ixlib=rb-1.2.1&amp;w=200"
          className={styles['image']}
        />
      </div>
    </div>
  )
}

export default Home

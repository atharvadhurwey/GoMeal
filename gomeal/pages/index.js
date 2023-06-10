import { Typography } from '@mui/material'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>GoMeal</title>
        <meta name="description" content="The Ecommerce website by sanity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="h1" variant='h1'>Sanity Amasd</Typography>
    </>
  )
}

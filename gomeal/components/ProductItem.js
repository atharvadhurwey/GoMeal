import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../utils/image';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image)}
            title={product.name}
            style={{height:200}}
          ></CardMedia>
          <CardContent>
            <Typography style={{fontWeight:'bold'}}>{product.name}</Typography>
            {/* <Rating value={product.rating} readOnly></Rating> */}
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions style={{display:'flex', justifyContent:'space-between'}}>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
           Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

import HtmlPage from '../components/HtmlPage';

export const metadata = { title: "Product - Secret Shop" };

const html = "<header class='top'><div class='logo'>SECRET SHOP</div><nav><a href=\"/\">Home</a> <a href=\"/shop\">Shop</a> <a href=\"#\">Cart</a></nav></header><section class='product'><div><img class='main' src='https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900'><div class='thumbs'><img src='https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200'><img src='https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=200'></div></div><div><span class='badge'>NEW</span><h1>Royal Black Watch</h1><h2>$799 <del>$999</del></h2><p>Luxury Swiss automatic watch.</p><button>Add To Cart</button> <button>Buy Now</button><h3>Description</h3><p>Premium luxury product page starter.</p></div></section><section class='related'><h2>Related Products</h2><div class='grid'><div class='card'><img src='https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300'><p>Bag</p></div><div class='card'><img src='https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300'><p>Shoes</p></div><div class='card'><img src='https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300'><p>Watch</p></div></div></section>";

export default function Page() {
  return <HtmlPage html={html} />;
}

import HtmlPage from '../components/HtmlPage';

export const metadata = { title: "Product - Secret Shop (18+)" };

const html = "<header class='top'><div class='logo'>SECRET SHOP</div><nav><a href=\"/\">Home</a> <a href=\"/wishlist\">Зүрхэлсэн</a> <a href=\"/cart\">Сагс</a></nav></header><section class='product' data-product-detail data-product-id='velvet-pulse-massager' data-product-name='Velvet Pulse Massager' data-product-price='2797000' data-product-price-label='2,797,000₮' data-product-image='/assets/images/products/product-1.png'><div><img class='main' src='/assets/images/products/product-1.png'><div class='thumbs'><img src='/assets/images/products/product-1.png'><img src='/assets/images/products/product-2.png'></div></div><div><span class='badge'>NEW</span><h1>Velvet Pulse Massager</h1><h2>2,797,000₮ <del>3,497,000₮</del></h2><p>Premium rechargeable massager with quiet motor.</p><button class='btn-add-cart-detail'>Сагсанд нэмэх</button> <button class='btn-wishlist-detail'><i class='fas fa-heart'></i></button><h3>Description</h3><p>Discreet packaging. Adults only (18+).</p></div></section><section class='related'><h2>Related Products</h2><div class='grid'><div class='card'><img src='/assets/images/products/product-3.png'><p>Wellness Kit</p></div><div class='card'><img src='/assets/images/products/product-4.png'><p>Lingerie Set</p></div><div class='card'><img src='/assets/images/products/product-5.png'><p>Massager</p></div></div></section><div class='toast' id='toast'><i class='fas fa-check-circle'></i><span id='toastMsg'></span></div>";

export default function Page() {
  return <HtmlPage html={html} />;
}

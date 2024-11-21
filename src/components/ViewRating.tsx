const ViewRating = () => {
return (
    <div id="utf_listing_reviews" class="utf_listing_section">
        <h3 class="utf_listing_headline_part margin-top-75 margin-bottom-20">Reviews <span>(08)</span></h3>
        <div class="clearfix"></div>
        <div class="reviews-container">
            <div class="row">
                <div class="col-lg-3">
                    <div id="review_summary">
                    <strong>Số rate trung bình</strong>
                    <small>Tổng số review</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="comments utf_listing_reviews">
            <ul>
                <li>
                    <div class="avatar"><img src="images/client-avatar1.jpg" alt="" /></div>
                    <div class="utf_comment_content">
                        <div class="utf_arrow_comment"></div>
                        <div class="utf_star_rating_section" data-rating="5"></div>
                        <div class="utf_by_comment">Tên khách hàng<span class="date"><i class="fa fa-clock-o"></i> Thời gian review </span> </div>
                        <p>Nội dung review.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="clearfix"></div>
        <div class="row">
            <div class="col-md-12">
                <div class="utf_pagination_container_part margin-top-30">
                    <nav class="pagination">
                        <ul>
                        <li><a href="#"><i class="sl sl-icon-arrow-left"></i></a></li>
                        <li><a href="#" class="current-page">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    )
}
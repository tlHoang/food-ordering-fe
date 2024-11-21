const CreateReview = () => {
    return (
        <div id="utf_add_review" class="utf_add_review-box">
            <h3 class="utf_listing_headline_part margin-bottom-20">Add Your Review</h3>
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="clearfix"></div>
                    <div class="utf_leave_rating margin-bottom-30">
                        <input type="radio" name="rating" id="rating-1" value="1" />
                        <label for="rating-1" class="fa fa-star"></label>
                        <input type="radio" name="rating" id="rating-2" value="2" />
                        <label for="rating-2" class="fa fa-star"></label>
                        <input type="radio" name="rating" id="rating-3" value="3" />
                        <label for="rating-3" class="fa fa-star"></label>
                        <input type="radio" name="rating" id="rating-4" value="4" />
                        <label for="rating-4" class="fa fa-star"></label>
                        <input type="radio" name="rating" id="rating-5" value="5" />
                        <label for="rating-5" class="fa fa-star"></label>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <form id="utf_add_comment" class="utf_add_comment">
                <fieldset>
                    <div class="row">
                        <div class="col-md-4">
                        <label>Name:</label>
                        <input type="text" placeholder="Name" value="" />
                        </div>
                    </div>
                    <div>
                        <label>Review:</label>
                        <textarea cols="40" placeholder="Your Message..." rows="3"></textarea>
                    </div>
                </fieldset>
                <button class="button">Submit Review</button>
                <div class="clearfix"></div>
            </form>
        </div>
    )
}
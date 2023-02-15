class UrlsController < ApplicationController
    def index
        @urls = Url.all 
        render json: @urls
    end

    def show 
    end 

    def create 

    end 

    def update
    end 

    def destroy
    end
end

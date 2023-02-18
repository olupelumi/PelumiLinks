class UrlsController < ApplicationController
    def index
        @urls = Url.all 
        render json: @urls
    end

    def show
        @url = Url.find_by(shortcut: params[:shortcut])
        render json: @url
    end

    def create 
        @url = Url.create(shortcut: params[:shortcut], long_url: params[:long_url])
        # TODO: make it so we don't have duplicate articles. This may be done in the model as a validation instead though. 
        # TODO: Add some error handling
        render json: Url.all
    end 

    def update
    end 

    def destroy
    end
end

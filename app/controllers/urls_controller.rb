class UrlsController < ApplicationController
    def index
        @urls = Url.all 
        render json: @urls
    end

    def show
        @url = Url.find_by(shortcut: params[:shortcut])
        redirect_to "https://www." + @url.long_url, allow_other_host: true
    end

    def create 
        @url = Url.create(shortcut: params[:shortcut], long_url: params[:long_url])
        # TODO: make it so we don't have duplicate articles. This may be done in the model as a validation instead though. 
        # TODO: Add some error handling
        render json: Url.all
    end 

    def update
        @url = Url.find_by(shortcut: params[:shortcut])
        @url.update(long_url: params[:long_url])
       # I initially said the response here should return all the mappings but I think it's better to have it show the updated mapping. 
       # TODO: Update the design
        render json: @url 
    end 

    def destroy
        @url = Url.destroy_by(shortcut: params[:shortcut])
        render json: Url.all
    end
end

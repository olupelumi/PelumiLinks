class UrlsController < ApplicationController
    def index
        @urls = Url.all 
        render json: @urls
    end

    def show
        @url = Url.find_by(shortcut: params[:shortcut])
        unless @url
            render json: {error: 'shortcut not found'}, status: 404
        else
            render json: @url
        end
    end

    def create 
        @url = Url.new(shortcut: params[:shortcut], long_url: params[:long_url])
        if @url.save
            render json: Url.all
        else
            render json: {error: "Error creating a new url redirect"}, status: 400
        end 
    end 

    def update
        @url = Url.find_by(shortcut: params[:shortcut])
        unless @url
            render json: {error: 'shortcut not found'}, status: 404
        else
            @url.update(long_url: params[:long_url])
            render json: Url.all 
        end
    end 

    def destroy
        @url = Url.destroy_by(shortcut: params[:shortcut])
        render json: Url.all
    end
end

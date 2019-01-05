
import sys
import requests
import time

start=time.time()

f1=open("movie_ID_name.csv",'w')
f2=open("movie_ID_sim_movie_ID.csv",'w')

api_key=str(sys.argv[1])

count=0

total_similar_list=[]
 
for page in range(15):
    page = page + 1
    api_link_comedy='https://api.themoviedb.org/3/discover/movie?api_key={}&sort_by=popularity.desc&page={}&primary_release_date.gte=2000-01-01&with_genres=35'.format(api_key,page)
    request_comedy = requests.get(api_link_comedy)
    data_comedy=request_comedy.json()
    comedy_movie_list=data_comedy['results']
    for movie in comedy_movie_list:
        count=count+1
        print(count)
        print(time.time()-start)
        movie_id=movie['id']
        title=movie['title']
        if ',' in title:
            title= '"' + title + '"'
        comedy_csv_string=str(movie_id) +','+title+ '\n'
        f1.write(comedy_csv_string)
        if count%39 ==0:
            time.sleep(10)
        api_link_similar='https://api.themoviedb.org/3/movie/{}/similar?api_key={}&language=en-US&page=1'.format(movie_id,api_key)
        request_similar = requests.get(api_link_similar)
        data_similar=request_similar.json()
        similar_movie_list=data_similar['results'][0:5]
        for similar in similar_movie_list:
            total_similar_list.append((movie_id,similar['id']))
        
exclude_list=[(id_m,id_s) for (id_m,id_s) in total_similar_list if (id_s,id_m) in total_similar_list and id_s >= id_m]
non_duplicate_list = [value for value in total_similar_list if value not in exclude_list]
[f2.write(str(id_m)+','+str(id_s)+'\n') for (id_m,id_s) in non_duplicate_list]
f1.close()
f2.close()


package com.jerm.ad340_helloworld

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.jerm.ad340_helloworld.api.CurrentWeather
import com.jerm.ad340_helloworld.api.createOpenWeatherMapService
import com.jerm.ad340_helloworld.api.WeeklyForecast
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import java.util.Date
import kotlin.random.Random

class ForecastRepository {

    private val weatherService = createOpenWeatherMapService()

    private val _currentWeather = MutableLiveData<CurrentWeather>()
    val currentWeather: LiveData<CurrentWeather> = _currentWeather

    private val _weeklyForecast = MutableLiveData<WeeklyForecast>()
    val weeklyForecast: LiveData<WeeklyForecast> = _weeklyForecast

    fun loadCurrentForecast(zipcode: String) {

        val call = weatherService.currentWeather(zipcode, BuildConfig.OPEN_WEATHER_MAP_API_KEY, "imperial")
        call.enqueue(object : Callback<CurrentWeather> {
            override fun onFailure(call: Call<CurrentWeather>, t: Throwable) {
                Log.e(ForecastRepository::class.java.simpleName, "Error loading current weather", t)
            }

            override fun onResponse(call: Call<CurrentWeather>, response: Response<CurrentWeather>) {
                val weatherResponse = response.body()
                if (weatherResponse != null) {
                    _currentWeather.value = weatherResponse
                }
            }
        })
    }

    fun loadWeeklyForecast(zipcode: String) {
        val call = weatherService.currentWeather(zipcode, BuildConfig.OPEN_WEATHER_MAP_API_KEY, "imperial")
        call.enqueue(object : Callback<CurrentWeather> {
            override fun onFailure(call: Call<CurrentWeather>, t: Throwable) {
                Log.e(ForecastRepository::class.java.simpleName, "Error loading location for weekly forecast", t)
            }

            override fun onResponse(call: Call<CurrentWeather>, response: Response<CurrentWeather>) {
                val weatherResponse = response.body()
                if (weatherResponse != null) {
                    val forecastCall = weatherService.sevenDayForecast(
                        lat = weatherResponse.coord.lat,
                        lon = weatherResponse.coord.lon,
                        exclude = "current,minutely,hourly",
                        units = "imperial",
                        apiKey = BuildConfig.OPEN_WEATHER_MAP_API_KEY
                    )

                    forecastCall.enqueue(object : Callback<WeeklyForecast> {
                        override fun onFailure(call: Call<WeeklyForecast>, t: Throwable) {
                            Log.e(ForecastRepository::class.java.simpleName, "error loading weekly forecast", t)
                        }

                        override fun onResponse(call: Call<WeeklyForecast>, response: Response<WeeklyForecast>) {
                            val weeklyForecastResponse = response.body()
                            if (weeklyForecastResponse != null) {
                                _weeklyForecast.value = weeklyForecastResponse
                            }
                        }

                    })
                }
            }
        })

    }


    private fun getTempDescription(temp: Float) : String {
        return when(temp){
            in Float.MIN_VALUE.rangeTo(0f) -> "Anything below 0 doesn't make sense"
            in Float.MIN_VALUE.rangeTo(32f) -> "Freezing!"
            in Float.MIN_VALUE.rangeTo(55f) -> "Dreary"
            in Float.MIN_VALUE.rangeTo(65f) -> "Quite nice"
            in Float.MIN_VALUE.rangeTo(80f) -> "Muggy"
            in Float.MIN_VALUE.rangeTo(90f) -> "Sauna"
            in Float.MIN_VALUE.rangeTo(100f) -> "Sweltering"
            in Float.MIN_VALUE.rangeTo(Float.MAX_VALUE) -> "Volcanic Activity"
            else -> "Does not compute"
        }
    }
}
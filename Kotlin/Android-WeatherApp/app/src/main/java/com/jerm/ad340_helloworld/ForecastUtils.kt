package com.jerm.ad340_helloworld

import android.content.Context
import android.widget.Toast
import androidx.appcompat.app.AlertDialog

fun formatTempForDisplay(temp: Float, tempDisplaySetting: TempDisplaySetting): String {
    return when (tempDisplaySetting){
        TempDisplaySetting.Fahrenheit -> String.format("%.2f F°", temp)
        TempDisplaySetting.Celsius -> {
            val temp = (temp - 32f) * (5f/9f)
            String.format("%.2f C°", temp)
        }
    }
}

fun showTempDisplaySettingDialog(context: Context, tempDisplaySettingManager: TempDisplaySettingManager) {
    val dialogBuilder = AlertDialog.Builder(context)
    dialogBuilder.setTitle(R.string.display_units_title)
    dialogBuilder.setMessage(R.string.display_units_text)
    dialogBuilder.setPositiveButton("F°") { _, _ ->
        tempDisplaySettingManager.updateSetting(TempDisplaySetting.Fahrenheit)
    }
    dialogBuilder.setNegativeButton("C°") {_,_ ->
        tempDisplaySettingManager.updateSetting(TempDisplaySetting.Celsius)
    }
    dialogBuilder.setOnDismissListener{
        Toast.makeText(context, R.string.display_units_dismiss, Toast.LENGTH_SHORT).show()
    }
    dialogBuilder.show()
}
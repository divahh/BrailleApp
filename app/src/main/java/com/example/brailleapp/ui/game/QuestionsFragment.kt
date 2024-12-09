package com.example.brailleapp.ui.game

import android.content.Context.VIBRATOR_MANAGER_SERVICE
import android.content.Context.VIBRATOR_SERVICE
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import com.example.brailleapp.databinding.FragmentQuestionsBinding

@Suppress("DEPRECATION")
class QuestionsFragment : Fragment() {
    private var binding: FragmentQuestionsBinding? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentQuestionsBinding.inflate(inflater, container, false)
        return binding!!.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupActionBar()

        binding?.apply {
            btn1.setOnClickListener {vibratePattern(1)}
            btn2.setOnClickListener {vibratePattern(2)}
            btn3.setOnClickListener {vibratePattern(3)}
            btn4.setOnClickListener {vibratePattern(4)}
            btn5.setOnClickListener {vibratePattern(5)}
            btn6.setOnClickListener {vibratePattern(6)}
        }
    }

    private fun vibratePattern(repeatCount: Int) {
        val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vibratorManager = requireContext().getSystemService(VIBRATOR_MANAGER_SERVICE) as VibratorManager
            vibratorManager.defaultVibrator
        } else {
            requireContext().getSystemService(VIBRATOR_SERVICE) as Vibrator
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Buat pola getaran
            val vibrationPattern = mutableListOf<Long>()
            for (i in 1..repeatCount) {
                vibrationPattern.add(0) // Delay sebelum getaran (ms)
                vibrationPattern.add(100) // Durasi getaran (ms)
                vibrationPattern.add(100)
            }

            // Aktifkan pola getaran
            vibrator.vibrate(
                VibrationEffect.createWaveform(
                    vibrationPattern.toLongArray(),
                    -1 // -1 artinya tidak diulang
                )
            )
        } else {
            // Untuk API lebih rendah dari 26
            for (i in 1..repeatCount) {
                vibrator.vibrate(200) // Durasi getaran (ms)
                Thread.sleep(200) // Delay antara getaran (ms)
            }
        }
    }

    private fun setupActionBar() {
        val appCompatActivity = activity as? AppCompatActivity
        appCompatActivity?.supportActionBar?.apply {
            title = "Questions"
            setDisplayHomeAsUpEnabled(true)
        }

        setHasOptionsMenu(true)
    }
}
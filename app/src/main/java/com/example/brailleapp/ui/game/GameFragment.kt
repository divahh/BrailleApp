package com.example.brailleapp.ui.game

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.brailleapp.R
import com.example.brailleapp.databinding.FragmentGameBinding

class GameFragment : Fragment() {

    private var _binding: FragmentGameBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentGameBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Navigasi ke QuestionsFragment saat tombol Yes ditekan
        binding.btYes.setOnClickListener {
//            findNavController().navigate(R.id.action_navigation_games_to_navigation_questions)
        }

        // Navigasi ke TryBrailleFragment saat tombol No ditekan
        binding.btNo.setOnClickListener {
//            findNavController().navigate(R.id.action_navigation_games_to_navigation_try_braille)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

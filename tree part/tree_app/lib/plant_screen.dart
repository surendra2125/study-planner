import 'dart:async';
import 'package:flutter/material.dart';

class PlantScreen extends StatefulWidget {
  final int duration;
  final String plantName;

  const PlantScreen({
    super.key,
    required this.duration,
    required this.plantName,
  });

  @override
  State<PlantScreen> createState() => _PlantScreenState();
}

class _PlantScreenState extends State<PlantScreen> {
  late Timer timer;
  double progress = 0.0;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    int totalTime = widget.duration;

    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      setState(() {
        progress += 1 / totalTime;

        if (progress >= 1) {
          progress = 1;
          timer.cancel();
          showCompletionDialog();
        }
      });
    });
  }

  Widget getPlantImage() {
    if (progress < 0.25) {
      return Image.asset('assets/seed.png', key: const ValueKey(1), height: 120);
    } else if (progress < 0.5) {
      return Image.asset('assets/sprout.png', key: const ValueKey(2), height: 140);
    } else if (progress < 0.75) {
      return Image.asset('assets/plant.png', key: const ValueKey(3), height: 160);
    } else {
      return Image.asset('assets/tree.png', key: const ValueKey(4), height: 200);
    }
  }

  void showCompletionDialog() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("🌳 Task Completed!"),
        content: const Text("Great job!"),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text("OK"),
          )
        ],
      ),
    );
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFDFF5E1),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            Text(
              widget.plantName,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 20),

            AnimatedSwitcher(
              duration: const Duration(milliseconds: 500),
              child: getPlantImage(),
            ),

            const SizedBox(height: 20),

            const Text("Growing..."),

            const SizedBox(height: 30),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: LinearProgressIndicator(
                value: progress,
                minHeight: 10,
              ),
            ),

            const SizedBox(height: 10),

            Text("${(progress * 100).toInt()}%"),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'plant_screen.dart';

class PlantSelectScreen extends StatelessWidget {
  final int duration;
  final String taskName;

  const PlantSelectScreen({
    super.key,
    required this.duration,
    required this.taskName,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.green[50],
      appBar: AppBar(title: const Text("Select Plant 🌿")),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [

          const Text(
            "Choose your plant",
            style: TextStyle(fontSize: 20),
          ),

          const SizedBox(height: 20),

          buildPlant(context, "Pine"),
          buildPlant(context, "Oak"),
          buildPlant(context, "Maple"),
        ],
      ),
    );
  }

  Widget buildPlant(BuildContext context, String name) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => PlantScreen(
                duration: duration,
                plantName: name,
              ),
            ),
          );
        },
        child: Text(name),
      ),
    );
  }
}